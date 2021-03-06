import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { environment } from "../environments/environment";

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
    // AngularFirestoreModule.enablePersistence()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
