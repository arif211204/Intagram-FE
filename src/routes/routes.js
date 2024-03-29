import {
 ChangePasswordPage,
 ForgotPasswordPage
} from '../pages/auth/forgot-password';
import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';
import { RequiredPage } from '../pages/auth/required';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { MessagePage } from '../pages/message/message';
import { ProfilePage } from '../pages/profile/profile';
import { Redirect } from '../pages/redirect/redirect';
import { SearchPage } from '../pages/search/search';
import { Verify } from '../pages/verify/verify';
import { ProtectedPage } from './protected-page';

class RouteClass {
 constructor(
  path,
  element,
  needLogin = false,
  guestOnly = false,
  required = false
 ) {
  this.path = path;
  this.element = (
   <ProtectedPage
    needLogin={needLogin}
    guestOnly={guestOnly}
    required={required}
   >
    {element}
   </ProtectedPage>
  );
 }
}

export const routes = [
 new RouteClass('login', <LoginPage />, false, true),
 new RouteClass('register', <RegisterPage />, false, true),
 new RouteClass('home', <HomePage />, true, false, true),
 new RouteClass('required', <RequiredPage />, true),
 new RouteClass('search', <SearchPage />, true, false, true),
 new RouteClass('profile', <ProfilePage />, true, false, true),
 new RouteClass('username/:username', <ProfilePage />, true, false, true),
 new RouteClass('explore', <ExplorePage />, true, false, true),
 new RouteClass('forgot-password', <ForgotPasswordPage />, false, true),
 new RouteClass('reset/:token', <ChangePasswordPage />, false, true),
 new RouteClass('message/:username', <MessagePage />, true, false, true),

 new RouteClass('verify/:token', <Verify />),

 new RouteClass('*', <Redirect />, false, true)
];
