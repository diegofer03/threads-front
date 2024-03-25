import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';
import { FeedService } from 'src/app/services/feed/feed.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { ContentThreadComponent } from 'src/app/components/content-thread/content-thread.component';
import { Thread } from 'src/app/models/threads-content.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, NgIconComponent, ContentThreadComponent],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  private feedService = inject(FeedService)
  threads: Thread[] = []

  ngOnInit(){
    this.feedService.getAll().subscribe({
      next: (data) => {
        this.threads = data
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
