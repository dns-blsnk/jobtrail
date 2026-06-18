import * as Yup from 'yup';
import type { BlockType } from './types';

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const EMAIL_REGEX = /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\+?[0-9\s\-().]{7,20}$/;

function urlField(label: string, required = false) {
  const base = Yup.string().matches(URL_REGEX, `${label} must be a valid URL (https://...)`);
  return required
    ? base.required(`${label} is required`)
    : base.nullable().optional();
}

const headerSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    firstName:  Yup.string().required('First name is required'),
    lastName:   Yup.string().required('Last name is required'),
    jobTitle:   Yup.string().required('Job title is required'),
    email:      Yup.string().matches(EMAIL_REGEX, 'Enter a valid email').required('Email is required'),
    phone:      Yup.string()
      .matches(PHONE_REGEX, 'Enter a valid phone number (7–20 digits)')
      .nullable()
      .optional(),
    location:   Yup.string().nullable().optional(),
    website:    urlField('Website'),
    photoUrl:   Yup.string().optional(),
    photoShape: Yup.string().oneOf(['circle', 'square', 'rounded']).optional(),
    links: Yup.array()
      .of(Yup.object({
        id:       Yup.string(),
        platform: Yup.string().required(),
        url:      Yup.string()
          .matches(URL_REGEX, 'Enter a valid URL (https://...)')
          .required('URL is required'),
      }))
      .optional(),
  }),
});

const summarySchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    sectionTitle: Yup.string().optional(),
    text: Yup.string().min(20, 'Summary should be at least 20 characters').required('Summary is required'),
  }),
});

const experienceItemSchema = Yup.object({
  id:          Yup.string(),
  company:     Yup.string().required('Company is required'),
  role:        Yup.string().required('Role is required'),
  startDate:   Yup.string().required('Start date is required'),
  endDate:     Yup.string().when('present', {
    is: false,
    then: (s) => s.required('End date is required'),
    otherwise: (s) => s.optional(),
  }),
  present:     Yup.boolean(),
  location:    Yup.string().optional(),
  description: Yup.string().optional(),
});

const experienceSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({ items: Yup.array().of(experienceItemSchema) }),
});

const educationItemSchema = Yup.object({
  id:          Yup.string(),
  institution: Yup.string().required('Institution is required'),
  degree:      Yup.string().required('Degree is required'),
  field:       Yup.string().required('Field of study is required'),
  startDate:   Yup.string().required('Start date is required'),
  endDate:     Yup.string().optional(),
  gpa:         Yup.string().optional(),
});

const educationSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({ items: Yup.array().of(educationItemSchema) }),
});

const skillsSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    groups: Yup.array()
      .of(Yup.object({
        id:   Yup.string(),
        name: Yup.string().required('Group name is required'),
        tags: Yup.array().of(Yup.string()).min(1, 'Add at least one skill'),
      }))
      .min(1, 'Add at least one group'),
  }),
});

const projectItemSchema = Yup.object({
  id:          Yup.string(),
  name:        Yup.string().required('Project name is required'),
  description: Yup.string().optional(),
  techStack:   Yup.array().of(Yup.string()),
  url:         urlField('Project URL'),
  startDate:   Yup.string().optional(),
  endDate:     Yup.string().optional(),
});

const projectsSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({ items: Yup.array().of(projectItemSchema) }),
});

const languagesSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    items: Yup.array()
      .of(Yup.object({
        id:       Yup.string(),
        language: Yup.string().required('Language is required'),
        level:    Yup.string().required('Level is required'),
      }))
      .min(1, 'Add at least one language'),
  }),
});

const certificationItemSchema = Yup.object({
  id:         Yup.string(),
  name:       Yup.string().required('Certification name is required'),
  issuer:     Yup.string().required('Issuer is required'),
  issueDate:  Yup.string().required('Issue date is required'),
  expiryDate: Yup.string().optional(),
  url:        urlField('Credential URL'),
});

const certificationsSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({ items: Yup.array().of(certificationItemSchema) }),
});

const socialLinksSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    items: Yup.array().of(Yup.object({
      id:       Yup.string(),
      platform: Yup.string().required(),
      url:      Yup.string()
        .matches(URL_REGEX, 'Enter a valid URL (https://...)')
        .required('URL is required'),
    })),
  }),
});

const awardsSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    items: Yup.array().of(Yup.object({
      id:          Yup.string(),
      title:       Yup.string().required('Title is required'),
      date:        Yup.string().optional(),
      description: Yup.string().optional(),
    })),
  }),
});

const customSchema = Yup.object({
  type: Yup.string(),
  data: Yup.object({
    sectionTitle: Yup.string().required('Section title is required'),
    content:      Yup.string().optional(),
  }),
});

export function getValidationSchema(type: BlockType): Yup.AnyObjectSchema {
  const map: Record<BlockType, Yup.AnyObjectSchema> = {
    header:         headerSchema,
    summary:        summarySchema,
    experience:     experienceSchema,
    education:      educationSchema,
    skills:         skillsSchema,
    projects:       projectsSchema,
    languages:      languagesSchema,
    certifications: certificationsSchema,
    'social-links': socialLinksSchema,
    awards:         awardsSchema,
    custom:         customSchema,
  };
  return map[type];
}
