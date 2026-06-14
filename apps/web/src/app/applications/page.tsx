import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { ApplicationsPage } from '@/views/applications/ui/applications-page';

export default withAuthGuard(ApplicationsPage);
