import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FeedService } from 'src/app/services/feed/feed.service';
import { Thread } from 'src/app/models/threads-content.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentThreadComponent } from 'src/app/components/content-thread/content-thread.component';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule, ContentThreadComponent],
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  private feedService = inject(FeedService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  threadId : string | null
  threads: Thread[] = []
  mainThread?: Thread
  loading = false
  skeleton_times = [1,2,3,4,5];

  constructor(){
    this.threadId = this.route.snapshot.paramMap.get('id')

    if(this.threadId){
      this.getTopThread()

    }else{
      this.router.navigate(['/home'])
    }
  }

  getTopThread(){
    this.loading = true
    this.feedService.getThreadById(this.threadId!).subscribe({
      next: data => {
        this.mainThread = data
        this.getByParentId()
      },
      error: error => {
        this.loading = false
        console.log(error)
      }
    })
  }

  getByParentId(){
    this.feedService.getByParentId(this.threadId!).subscribe({
      next: data => {
        this.threads = data
        this.loading = false
      },
      error: error => {
        this.loading = false
        console.log(error)
      }
    })
  }
}
