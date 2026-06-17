import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { AnalyticsPage } from '@/views/analytics/ui/analytics-page';

export default withAuthGuard(async () => <AnalyticsPage />);
