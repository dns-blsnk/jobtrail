import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { ApplicationsPage } from '@/views/applications/ui/applications-page';

export default withAuthGuard(async () => <ApplicationsPage />);
