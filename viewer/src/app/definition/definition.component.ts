import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

interface HeadingNode {
  name: string;
  level: number;
  children?: HeadingNode[];
  id: string;
}

@Component({
    selector: 'app-definition',
    imports: [
        CommonModule,
        RouterModule,
        MarkdownModule,
        MatTreeModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
    ],
    templateUrl: './definition.component.html',
    styleUrl: './definition.component.scss'
})
export class DefinitionComponent implements OnInit {
  headings?: NodeListOf<Element>;
  private isBrowser: boolean;
  headingNodes: HeadingNode[] = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // `setTimeout` is needed to avoid exception `ExpressionChangedAfterItHasBeenCheckedError`
    setTimeout(() => {
      this.headings = this.document
        .getElementById('md')!
        .querySelectorAll('h2, h3, h4, h5, h6');
      //TODO: render navigation tree
      this.headingNodes = this.buildHeadingTree(this.headings);
    });
  }

  buildHeadingTree(headings: NodeListOf<Element>): HeadingNode[] {
    const headingArray: HeadingNode[] = Array.from(headings).map((heading) => ({
      name: heading.textContent || '',
      level: parseInt(heading.tagName[1], 10),
      id: heading.id,
      children: [],
    }));

    const root: HeadingNode[] = [];
    const stack: HeadingNode[] = [];

    headingArray.forEach((heading) => {
      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= heading.level
      ) {
        stack.pop();
      }
      if (stack.length === 0) {
        root.push(heading);
      } else {
        const parent = stack[stack.length - 1];
        parent.children = parent.children || [];
        parent.children.push(heading);
      }
      stack.push(heading);
    });

    return root;
  }

  jumpToElement(id: string) {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  jump() {
    if (!this.isBrowser) {
      return;
    }
    const resource = this.route.snapshot.paramMap.get('resource');
    if (resource) {
      document.querySelectorAll('h2').forEach((el) => {
        if (el.textContent?.includes(resource)) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    //TODO: in case there is an id multiple times (like in different resources), we need to find the correct by first going to the h2 and then to the h3.
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      document.querySelectorAll('h3').forEach((el) => {
        if (el.textContent?.includes(id)) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
