import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { ApplicationsPage } from '@/pages/applications/ui/applications-page';

export default withAuthGuard(async () => <ApplicationsPage />);
