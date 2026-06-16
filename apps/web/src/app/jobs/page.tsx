import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { JobsPage } from '@/pages/jobs/ui/jobs-page';

export default withAuthGuard(async () => <JobsPage />);
