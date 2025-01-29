import {Routes} from '@angular/router';
import {AdminComponent} from "./views/admin/admin.component";
import {LayoutComponent} from "./views/admin/layout/layout.component";
import {authGuard} from "./core/auth.guard";
import {AuthComponent} from "./views/admin/auth/auth.component";
import {LoginComponent} from "./views/admin/auth/login/login.component";
import {MainComponent} from "./views/admin/main/main.component";
import {TeacherComponent} from "./views/admin/teacher/teacher.component";
import {TeacherCreateComponent} from "./views/admin/teacher/create/create.component";
import {TeacherMainComponent} from "./views/admin/teacher/main/main.component";
import {TeacherViewComponent} from "./views/admin/teacher/view/view.component";
import {TeacherUpdateComponent} from "./views/admin/teacher/update/update.component";
import {CategoriesComponent} from "./views/admin/categories/categories.component";
import {CategoryMainComponent} from "./views/admin/categories/main/main.component";
import {CategoryCreateComponent} from "./views/admin/categories/create/create.component";
import {CategoryUpdateComponent} from "./views/admin/categories/update/update.component";
import {DocumentsComponent} from "./views/admin/documents/documents.component";
import {DocumentCreateComponent} from "./views/admin/documents/create/create.component";
import {DocumentMainComponent} from "./views/admin/documents/main/main.component";
import {DocumentUpdateComponent} from "./views/admin/documents/update/update.component";
import {LessonsComponent} from "./views/admin/lessons/lessons.component";
import {LessonMainComponent} from "./views/admin/lessons/main/main.component";
import {LessonCreateComponent} from "./views/admin/lessons/create/create.component";
import {LessonViewComponent} from "./views/admin/lessons/view/view.component";
import {LessonUpdateComponent} from "./views/admin/lessons/update/update.component";
import {OffersComponent} from "./views/admin/offers/offers.component";
import {OfferMainComponent} from "./views/admin/offers/main/main.component";
import {OfferCreateComponent} from "./views/admin/offers/create/create.component";
import {OfferViewComponent} from "./views/admin/offers/view/view.component";
import {OfferUpdateComponent} from "./views/admin/offers/update/update.component";
import {PhotosComponent} from "./views/admin/photos/photos.component";
import {PhotoMainComponent} from "./views/admin/photos/main/main.component";
import {PhotoCreateComponent} from "./views/admin/photos/create/create.component";
import {SiteComponent} from "./views/site/site.component";

export const routes: Routes = [
  {
    path: '', component: SiteComponent, pathMatch: "full"
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin', component: LayoutComponent, canActivateChild: [authGuard], children: [
          {path: '', component: MainComponent, pathMatch: "full"},
          {
            path: 'teacher', component: TeacherComponent, children: [
              {path: '', component: TeacherMainComponent, pathMatch: "full"},
              {path: 'create', component: TeacherCreateComponent},
              {path: ':id', component: TeacherViewComponent},
              {path: 'update/:id', component: TeacherUpdateComponent}
            ]
          },
          {
            path: 'category', component: CategoriesComponent, children: [
              {path: '', component: CategoryMainComponent, pathMatch: "full"},
              {path: 'create', component: CategoryCreateComponent},
              {path: 'update/:id', component: CategoryUpdateComponent}
            ]
          },
          {
            path: 'document', component: DocumentsComponent, children: [
              {path: '', component: DocumentMainComponent, pathMatch: "full"},
              {path: 'create', component: DocumentCreateComponent},
              {path: 'update/:id', component: DocumentUpdateComponent}
            ]
          },
          {
            path: 'lesson', component: LessonsComponent, children: [
              {path: '', component: LessonMainComponent, pathMatch: "full"},
              {path: 'create', component: LessonCreateComponent},
              {path: ':id', component: LessonViewComponent},
              {path: 'update/:id', component: LessonUpdateComponent}
            ]
          },
          {
            path: 'offer', component: OffersComponent, children: [
              {path: '', component: OfferMainComponent, pathMatch: "full"},
              {path: 'create', component: OfferCreateComponent},
              {path: ':id', component: OfferViewComponent},
              {path: 'update/:id', component: OfferUpdateComponent}
            ]
          },
          {
            path: 'photo', component: PhotosComponent, children: [
              {path: '', component: PhotoMainComponent, pathMatch: "full"},
              {path: 'create', component: PhotoCreateComponent}
            ]
          },
        ]
      },
      {
        path: '', component: AuthComponent, children: [
          {path: 'login', component: LoginComponent},
          // {path: 'registration', component: LoginComponent},
        ]
      },
    ]
  },
];
