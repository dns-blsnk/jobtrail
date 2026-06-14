import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { JobsPage } from '@/views/jobs/ui/jobs-page';

export default withAuthGuard(JobsPage);
