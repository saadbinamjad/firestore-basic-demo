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
  
  booksCollection : AngularFirestoreCollection<Books>;
  books$ : Observable<Books[]>

  title = "app";
  
  constructor(private angularfirestore: AngularFirestore) {}

  ngOnInit() {
    this.booksCollection = this.angularfirestore.collection('books');
    this.books$ = this.booksCollection.valueChanges();
  }
}
