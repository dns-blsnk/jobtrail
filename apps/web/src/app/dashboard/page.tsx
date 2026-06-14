import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { DashboardPage } from '@/views/dashboard/ui/dashboard-page';

export default withAuthGuard(DashboardPage);
