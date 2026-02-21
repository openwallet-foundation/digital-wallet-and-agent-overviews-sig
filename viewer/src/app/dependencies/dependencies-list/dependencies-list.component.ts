import { Component, inject } from '@angular/core';
import { DependenciesService } from '../dependencies.service';
import { DependencyListEmbeddedComponent } from '../dependencies-list-embedded/dependencies-list-embedded.component';

@Component({
  selector: 'app-dependencies-list',
  imports: [DependencyListEmbeddedComponent],
  templateUrl: './dependencies-list.component.html',
  styleUrl: './dependencies-list.component.scss',
})
export class DependenciesListComponent {
  dependenciesService = inject(DependenciesService);
}
