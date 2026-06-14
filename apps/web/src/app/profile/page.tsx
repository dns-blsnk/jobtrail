import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { ProfilePage } from '@/views/profile/ui/profile-page';

export default withAuthGuard(ProfilePage);
