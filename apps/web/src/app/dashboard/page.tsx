import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { DashboardPage } from '@/pages/dashboard/ui/dashboard-page';

export default withAuthGuard(async ({ session }) => <DashboardPage session={session} />);
