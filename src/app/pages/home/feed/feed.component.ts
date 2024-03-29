import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';
import { FeedService } from 'src/app/services/feed/feed.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { ContentThreadComponent } from 'src/app/components/content-thread/content-thread.component';
import { Thread } from 'src/app/models/threads-content.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, NgIconComponent, ContentThreadComponent, NgxSkeletonLoaderModule],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  private feedService = inject(FeedService)
  threads: Thread[] = []
  loading = false
  skeleton_times = [1,2,3,4,5];

  ngOnInit(){
    this.loading = true
    this.feedService.getAll().subscribe({
      next: (data) => {
        this.threads = data
        this.threads.sort(this.compare)
        this.loading = false
        console.log(data)
      },
      error: (error) => {
        this.loading = false
        console.log(error)
      }
    })
  }

  compare( a: Thread, b:Thread ) {
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    return 0;
  }
}
