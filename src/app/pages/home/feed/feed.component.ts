import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';
import { FeedService } from 'src/app/services/feed/feed.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, NgIconComponent],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  private feedService = inject(FeedService)

  ngOnInit(){
    this.feedService.getAll().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
