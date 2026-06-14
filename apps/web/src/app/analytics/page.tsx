import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { AnalyticsPage } from '@/views/analytics/ui/analytics-page';

export default withAuthGuard(AnalyticsPage);
