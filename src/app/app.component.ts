import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

interface Books {
  id: number;
  name: string;
  author: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  booksCollection: AngularFirestoreCollection<Books>;
  booksDocument: AngularFirestoreDocument<Books>;
  booksRead$: Observable<Books[]>;
  booksUpdate$: Observable<Books>;
  public newName: string = "";
  public newAuthor: string = "";
  public snapShot: any;

  title = "app";

  constructor(private angularfirestore: AngularFirestore) {}

  ngOnInit() {
    //READ ALL

    this.booksCollection = this.angularfirestore.collection("books");
    this.booksRead$ = this.booksCollection.valueChanges();

    // Update
    // this.booksDocument = this.angularfirestore.doc(
    //   "DOC NAME"
    // );
    this.booksUpdate$ = this.booksDocument.valueChanges();

    // this.snapShot = this.booksCollection.snapshotChanges().map(arr => {
    //   console.log(arr)
    //   return arr.map(snap => {
    //     snap.payload.doc.data();});
    // });
  }

  updateName() {
    this.booksDocument.update({ name: this.newName, author: this.newAuthor });
  }
}
