import { Component, OnInit } from '@angular/core';
import {EMPTY_ARRAY, TuiHandler} from '@taiga-ui/cdk';
import { TreeNode } from '@core/models' 

@Component({
  selector: 'registry-search',
  templateUrl: './search.component.html'
})
export class RegistrySearchComponent implements OnInit {
  
    data : any[] = [];

    readonly menu: TreeNode = {
        text: 'Registry',
        children: [
            {
                text: 'Недвижимое имущество',
                children: [
                {text: 'Жилое', category:'real-estate_dwelling'}, 
                {text: 'Нежилое', category:'real-estate_uninhabited '}
                ],
                category:'real-estate'
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {text: 'Top level 2', category:''}    
            ,
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            }
            ,
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            }    
        ],
        category:''
    };

    constructor() { }

    ngOnInit() {
    }

    readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = item =>
        item.children || EMPTY_ARRAY;

}

