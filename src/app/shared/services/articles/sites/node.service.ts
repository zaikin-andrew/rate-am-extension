import { Injectable } from '@angular/core';
import { Site } from '../../../interfaces/articles';
import { ServerlessService } from './serverless.service';

@Injectable({
  providedIn: 'root',
})
export class NodeService extends ServerlessService {

  protected siteUrl = 'https://nodeweekly.com';
  protected site: Site = 'node';

}
