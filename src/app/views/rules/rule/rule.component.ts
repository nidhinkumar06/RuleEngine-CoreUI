import { Component, AfterViewInit, HostBinding, ViewChild, HostListener, OnInit } from '@angular/core';
import { FlowchartConstants, FcModel, UserCallbacks, FcNode } from '../../../../flowchart/ngx-flowchart.models';
import { of } from 'rxjs';
import { NgxFlowchartComponent } from '../../../../flowchart/ngx-flowchart.component';
import { map, some } from 'lodash';
import { RuleService } from '../rule.service';
import { DELETE } from '@angular/cdk/keycodes';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ENRICHMENT_NODE_DATA } from '../../../../constants/constants';
import { RULEENGINE_DATA } from '../../../../constants/dummyData';
import { RuledialogComponent } from '../ruledialog/ruledialog.component';
import { EdgedialogComponent } from '../edgedialog/edgedialog.component';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.tabindex')
  get tabindex(): string {
    return '0';
  }

  constructor(private ruleService: RuleService, private dialog: MatDialog) {
    this.enrichmentTypesModel.nodes.push(...ENRICHMENT_NODE_DATA);
    //this.initData(); //show saved data
  }

  flowchartConstants = FlowchartConstants;

  nodeTypesFlowchartselected = [];

  actionTypesModel: FcModel = {
    nodes: [],
    edges: []
  };

  enrichmentTypesModel: FcModel = {
    nodes: [],
    edges: []
  };

  flowchartselected = [];

  model: FcModel = {
    nodes: [],
    edges: []
  };

  nextNodeID = 10;
  nextConnectorID = 20;

  callbacks: UserCallbacks = {
    edgeDoubleClick: (event, edge) => {},
    edgeEdit: (event, edge) => {
      // const label = prompt('Enter a link label:', edge.label);
      // if (label) {
      //   edge.label = label;
      // }
      this.openEdgeDialog(edge);
    },
    edgeMouseOver: event => {},
    isValidEdge: (source, destination) => {
      return source.type === FlowchartConstants.rightConnectorType && destination.type === FlowchartConstants.leftConnectorType;
    },
    createEdge: (event, edge) => {
      console.log('event is', event);
      edge.label = 'Yes';
      this.openEdgeDialog(edge);
      return of(edge);
    },
    dropNode: (event, node) => {
      if (node.type === 'node') {
        this.openDialog(node);
      } else {
        this.saveModal(node);
      }
    },
    edgeAdded: edge => {},
    nodeRemoved: node => {},
    edgeRemoved: edge => {},
    nodeCallbacks: {
      doubleClick: event => {},
      nodeEdit: (event, node) => {
        // const name = prompt('Enter a node name:', node.name);
        // if (name) {
        //   node.name = name;
        // }
        if (node.type === 'node') {
          this.openDialog(node);
        } else {
          this.saveModal(node);
        }
      }
    }
  };

  @ViewChild('fcCanvas', {static: true}) fcCanvas: NgxFlowchartComponent;


  openDialog(node: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: node.name,
      fact: node.conditions && node.conditions.fact || '',
      operator: node.conditions && node.conditions.operator || '',
      value: node.conditions && node.conditions.value || '',
    };

    const dialogRef = this.dialog.open(RuledialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        node.id = (this.nextNodeID++) + '';
        node.name = result.fact;

        node.conditions = result;
        node.connectors = [
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.leftConnectorType
          },
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.rightConnectorType
          }
        ];
        this.model.nodes.push(node);
      });
  }

  openEdgeDialog(edge: any) {
    const edgeDialogConfig = new MatDialogConfig();

    edgeDialogConfig.disableClose = true;
    edgeDialogConfig.autoFocus = true;

    edgeDialogConfig.data = {
      option:  edge.label || 'Yes',
    };

    const dialogRef = this.dialog.open(EdgedialogComponent, edgeDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      map(this.model.nodes, (node: any) => {
        const isSourceIdMatches = some(node.connectors, {id: edge.source});
        const isDestinationIdMatches = some(node.connectors, {id: edge.destination});
        if (isSourceIdMatches) {
          edge.source_id = node.id;
          edge.source_condition = node.conditions;
          edge.source_type = node.type;
        }

        if (isDestinationIdMatches) {
          edge.destination_id = node.id;
          edge.destination_type = node.type;
          if (node.type === 'action') {
            edge.destination_action = node.name;
          }
        }
      });
      edge.label = result;
    });

  }

  saveModal(node: any) {
    node.id = (this.nextNodeID++) + '';
    node.connectors = [
      {
        id: (this.nextConnectorID++) + '',
        type: FlowchartConstants.leftConnectorType
      },
      // {
      //   id: (this.nextConnectorID++) + '',
      //   type: FlowchartConstants.rightConnectorType
      // } //enable this code if you need the actions to have right connector
    ];
    this.model.nodes.push(node);
  }

  ngOnInit() {
    this.ruleService.fetchActions().subscribe(data => {
      this.createActionData(data);
    }, error => {
      console.log('error is', error);
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.fcCanvas.modelService);
  }

  createActionData(actionDatas: any) {
    actionDatas.map((data, index) => {
      const actionNode: FcNode = {
        name: data.name,
        id: data.id + '',
        x: 25,
        y: 75 * (index + 1),
        color: '#DEC111',
        icon: 'flash_on',
        type: 'action',
        connectors: [
          {
            type: FlowchartConstants.leftConnectorType,
            id: (index * 2 + 1) + ''
          },
          // {
          //   type: FlowchartConstants.rightConnectorType,
          //   id: (index * 2 + 2) + ''
          // } //enable this code if you need the actions to have right connector
        ]
      };

      this.actionTypesModel.nodes.push(actionNode);
    });
  }

  initData() {
    this.model.nodes.push(...RULEENGINE_DATA.nodes);
    this.model.edges.push(...RULEENGINE_DATA.edges);
  }

  @HostListener('keydown.control.a', ['$event'])
  public onCtrlA(event: KeyboardEvent) {
    this.fcCanvas.modelService.selectAll();
  }

  @HostListener('keydown.esc', ['$event'])
  public onEsc(event: KeyboardEvent) {
    this.fcCanvas.modelService.deselectAll();
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if (event.keyCode === DELETE) {
      this.fcCanvas.modelService.deleteSelected();
    }
  }

  saveRule() {
    console.log('save rule got called', this.model);
    // console.log('stringified data', JSON.stringify(this.model));
  }
}
