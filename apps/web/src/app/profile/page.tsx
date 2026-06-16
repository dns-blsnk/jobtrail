import { withAuthGuard } from '@/shared/lib/auth/with-auth-guard';
import { ProfilePage } from '@/pages/profile/ui/profile-page';

export default withAuthGuard(async ({ session }) => <ProfilePage session={session} />);
