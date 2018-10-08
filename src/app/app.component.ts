import { Component, OnInit,TemplateRef  } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore,AngularFirestoreCollection} from 'angularfire2/firestore';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  i=1;
  pokemon_pic = ``;
  pokemon_data:any[]=[];
  dashData:any[] = [];
  modalRef: BsModalRef;
  el = document.getElementsByClassName('types');
  storeFIlterName: any[];
  constructor(public db: AngularFireDatabase, private afs: AngularFirestore, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.afs.collection('pokemon').ref.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        this.pokemon_data = documentSnapshot.data().pokemon;
        this.dashData = documentSnapshot.data().pokemon;
      }); 
    });
  //   this.afs.collection("pokemon").doc("ndZ7FJs0fKBaWFOEX04q").set({
  // })
  }

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template,{class: 'modal-lg detail-body'});
  }

  searchPokemon(e) {
    this.dashData = this.pokemon_data;
    this.storeFIlterName = [];
    const q = e.toLowerCase();
    if (e !== null) {
        for (const pokemon of this.dashData) {
            if (pokemon.name.toLowerCase().includes(q)) {
                this.storeFIlterName.push(pokemon);
            }
        }
    } else {
        this.storeFIlterName = this.pokemon_data;
    }

    this.dashData = this.storeFIlterName;
  }

}
