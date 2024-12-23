import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DependenciesService } from '../dependencies.service';
import { DependencyListEmbeddedComponent } from '../dependencies-list-embedded/dependencies-list-embedded.component';

@Component({
    selector: 'app-dependencies-list',
    imports: [CommonModule, DependencyListEmbeddedComponent],
    templateUrl: './dependencies-list.component.html',
    styleUrl: './dependencies-list.component.scss'
})
export class DependenciesListComponent {
  constructor(public dependenciesService: DependenciesService) {}
}
