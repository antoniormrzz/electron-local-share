import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss']
})
export class FilesPage implements OnInit {
  public files: { size:string, name: string, url: string }[] = [];
  public searchResults: { size:string, name: string, url: string }[] = [];
  public loaded = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.loaded = false;
    fetch('/api/filelist')
      .then(response => response.json())
      .then(data => {
        this.files = data;
        this.searchResults = data;
        this.loaded = true;
      });
  }

  searchHandler(event) {
    this.searchResults = this.files.filter(e =>
      e.name.toLocaleLowerCase().includes((event.target.value as string).toLocaleLowerCase())
    );
  }
}
