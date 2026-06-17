import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { JobsPage } from '@/views/jobs/ui/jobs-page';

export default withAuthGuard(async () => <JobsPage />);
