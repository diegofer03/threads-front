import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

}
