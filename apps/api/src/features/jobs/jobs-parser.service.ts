import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { JobSource } from '@prisma/client';

const TECH_DICTIONARY = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte',
  'Node.js', 'NestJS', 'Express', 'Fastify', 'Koa',
  'Python', 'FastAPI', 'Django', 'Flask', 'SQLAlchemy',
  'Go', 'Rust', 'Java', 'Kotlin', 'Spring Boot', 'Spring', 'Hibernate',
  'Swift', 'Objective-C', 'C#', '.NET', 'ASP.NET', 'C++', 'PHP', 'Laravel', 'Symfony',
  'Ruby', 'Ruby on Rails', 'Scala', 'Elixir', 'Phoenix',
  'PostgreSQL', 'MySQL', 'SQLite', 'MSSQL', 'Oracle',
  'MongoDB', 'CouchDB', 'DynamoDB', 'Cassandra', 'Elasticsearch', 'OpenSearch',
  'Redis', 'Memcached', 'RabbitMQ', 'Kafka', 'NATS',
  'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Pulumi', 'Ansible',
  'AWS', 'GCP', 'Azure', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify',
  'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'Bitbucket',
  'GraphQL', 'REST', 'gRPC', 'WebSockets', 'tRPC', 'OpenAPI', 'Swagger',
  'Jest', 'Vitest', 'Cypress', 'Playwright', 'Testing Library', 'Mocha', 'Chai',
  'Prisma', 'TypeORM', 'Sequelize', 'Drizzle', 'Knex',
  'Tailwind', 'SCSS', 'Sass', 'CSS-in-JS', 'Styled Components', 'Emotion', 'MUI', 'Ant Design',
  'Webpack', 'Vite', 'Rollup', 'esbuild', 'Babel', 'SWC',
  'Git', 'GitHub', 'GitLab', 'Bitbucket',
  'Figma', 'Storybook', 'Chromatic',
  'Zustand', 'Redux', 'MobX', 'Jotai', 'Recoil', 'Pinia', 'Vuex',
  'React Native', 'Flutter', 'Expo',
  'Linux', 'Unix', 'Nginx', 'Apache', 'HAProxy',
  'Microservices', 'Monorepo', 'Turborepo', 'Nx', 'Lerna',
  'WebAssembly', 'WASM',
  'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
  'Solidity', 'Web3', 'Ethers.js',
];

export interface ParsedJobData {
  title: string;
  company: string;
  location: string | null;
  remote: boolean | null;
  description: string | null;
  requirements: string | null;
  techStack: string[];
  source: JobSource;
  sourceUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
}

@Injectable()
export class JobsParserService {
  async parseUrl(url: string): Promise<ParsedJobData> {
    let html: string;
    try {
      const response = await axios.get<string>(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10_000,
        maxRedirects: 5,
      });
      html = response.data;
    } catch {
      throw new UnprocessableEntityException(
        'Could not fetch the job posting. The URL may be unavailable or require authentication.',
      );
    }

    const $ = cheerio.load(html);
    const source = this.detectSource(url);
    const raw = this.extractBySource($, source, url);

    if (!raw.title || !raw.company) {
      throw new UnprocessableEntityException(
        'Could not extract job title or company from this URL. Try adding the job manually.',
      );
    }

    const fullText = [raw.description ?? '', raw.requirements ?? ''].join(' ');
    const techStack = this.extractTechStack(fullText);
    const salary = this.extractSalary(fullText);

    return {
      ...raw,
      techStack,
      source,
      sourceUrl: url,
      salaryMin: salary.min,
      salaryMax: salary.max,
      salaryCurrency: salary.currency,
    };
  }

  private detectSource(url: string): JobSource {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('linkedin')) return 'LINKEDIN';
    if (hostname.includes('indeed')) return 'INDEED';
    if (hostname.includes('glassdoor')) return 'GLASSDOOR';
    if (hostname.includes('djinni')) return 'DJINNI';
    if (hostname.includes('dou.ua')) return 'DOU';
    return 'OTHER';
  }

  private extractBySource(
    $: cheerio.CheerioAPI,
    source: JobSource,
    _url: string,
  ): Omit<ParsedJobData, 'techStack' | 'source' | 'sourceUrl' | 'salaryMin' | 'salaryMax' | 'salaryCurrency'> {
    switch (source) {
      case 'LINKEDIN':
        return this.extractLinkedIn($);
      case 'DJINNI':
        return this.extractDjinni($);
      case 'DOU':
        return this.extractDou($);
      default:
        return this.extractGeneric($);
    }
  }

  private extractLinkedIn($: cheerio.CheerioAPI) {
    const title =
      $('h1.top-card-layout__title').text().trim() ||
      $('h1.job-details-jobs-unified-top-card__job-title').text().trim() ||
      $('h1').first().text().trim();

    const company =
      $('a.topcard__org-name-link').text().trim() ||
      $('.job-details-jobs-unified-top-card__company-name').text().trim() ||
      $('span.topcard__flavor').first().text().trim();

    const location =
      $('.topcard__flavor--bullet').text().trim() ||
      $('.job-details-jobs-unified-top-card__bullet').text().trim() ||
      null;

    const descriptionEl =
      $('.jobs-description__content') ||
      $('.description__text');
    const description = descriptionEl.text().trim() || this.extractBodyText($);

    const remote = /remote/i.test(location ?? '') || /remote/i.test(description ?? '') || null;

    return { title, company, location: location || null, remote, description, requirements: null };
  }

  private extractDjinni($: cheerio.CheerioAPI) {
    const title = $('h1.job-details__title, h1').first().text().trim();
    const company =
      $('.job-details__company-name, .employer-card__title').text().trim() ||
      $('a[href*="/companies/"]').first().text().trim();
    const location = $('.job-details__location, .location').first().text().trim() || null;
    const description =
      $('.job-description, .mb-4').text().trim() || this.extractBodyText($);
    const remote = /remote/i.test(description ?? '') || /remote/i.test(location ?? '') || null;

    return { title, company, location, remote, description, requirements: null };
  }

  private extractDou($: cheerio.CheerioAPI) {
    const title = $('.vacancy-section h1, .b-vacancy-title').first().text().trim();
    const company = $('.b-vacancy-company a, .company-name').first().text().trim();
    const location =
      $('.place .bi-geo-alt-fill').parent().text().trim() ||
      $('.b-vacancy-describe-company-info span').text().trim() ||
      null;
    const description =
      $('.b-vacancy-describe-company-info, .vacancy-section').text().trim() ||
      this.extractBodyText($);
    const remote = /remote/i.test(description ?? '') || /remote/i.test(title ?? '') || null;

    return { title, company, location, remote, description, requirements: null };
  }

  private extractGeneric($: cheerio.CheerioAPI) {
    const title =
      $('h1[class*="title"], h1[class*="job"], h1[class*="position"]').first().text().trim() ||
      $('h1').first().text().trim() ||
      $('title').text().split('|')[0].split('-')[0].trim();

    const company =
      $('[class*="company"], [class*="employer"], [class*="organization"]').first().text().trim() ||
      $('meta[property="og:site_name"]').attr('content') ||
      '';

    const location =
      $('[class*="location"], [class*="place"]').first().text().trim() || null;

    const description = this.extractBodyText($);
    const remote = /remote/i.test(description ?? '') || /remote/i.test(title ?? '') || null;

    return { title, company, location, remote, description, requirements: null };
  }

  private extractBodyText($: cheerio.CheerioAPI): string {
    $('script, style, nav, header, footer').remove();
    return $('body').text().replace(/\s+/g, ' ').trim().slice(0, 8000);
  }

  extractTechStack(text: string): string[] {
    const found = new Set<string>();
    const lower = text.toLowerCase();
    for (const tech of TECH_DICTIONARY) {
      const pattern = new RegExp(`(?<![a-z])${tech.toLowerCase().replace(/\./g, '\\.')}(?![a-z])`, 'i');
      if (pattern.test(lower)) {
        found.add(tech);
      }
    }
    return [...found];
  }

  private extractSalary(text: string): { min: number | null; max: number | null; currency: string | null } {
    const usdPattern = /\$\s*(\d[\d,]*)\s*(?:k\b)?(?:\s*[-–—]\s*\$?\s*(\d[\d,]*)\s*(?:k\b)?)?/i;
    const match = usdPattern.exec(text);
    if (!match) return { min: null, max: null, currency: null };

    const toNum = (s: string, isK: boolean) => {
      const n = parseInt(s.replace(/,/g, ''), 10);
      return isK || n < 1000 ? n * 1000 : n;
    };

    const hasK = /k\b/i.test(match[0]);
    const min = match[1] ? toNum(match[1], hasK) : null;
    const max = match[2] ? toNum(match[2], hasK) : null;

    return { min, max, currency: 'USD' };
  }
}
