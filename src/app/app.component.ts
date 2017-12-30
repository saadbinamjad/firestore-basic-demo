import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

interface SuperHeroes {
  name: string;
  power: string;
}

interface SuperHeroId extends SuperHeroes {
  id: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  superHeroesCollection: AngularFirestoreCollection<SuperHeroes>;
  superHeroDocument: AngularFirestoreDocument<SuperHeroes>;
  superHeroes: any;
  selectedHero: any;

  public snapShot: any;
  public formData: SuperHeroes = { name: "", power: "" };

  title = "SuperHeroes";

  constructor(private angularfirestore: AngularFirestore) {}

  ngOnInit() {
    //READ ALL
    this.superHeroesCollection = this.angularfirestore.collection(
      "superHeroes"
    );

    this.superHeroes = this.superHeroesCollection
      .snapshotChanges()
      .map(data => {
        return data.map(snap => {
          const data = snap.payload.doc.data() as SuperHeroes;
          const id = snap.payload.doc.id;
          return { id, data };
        });
      });
  }

  updateSuperHero() {
    const name = this.formData.name || this.selectedHero.name;
    const power = this.formData.power || this.selectedHero.power;
    this.superHeroDocument.update({ name: name, power: power });
  }

  postSuperHero() {
    this.superHeroesCollection.add(this.formData);
  }

  getDetails(hero) {
    let { id } = hero;
    this.superHeroDocument = this.angularfirestore.doc("superHeroes/" + id);
    this.superHeroDocument
      .valueChanges()
      .subscribe(data => (this.selectedHero = data));
  }
}
