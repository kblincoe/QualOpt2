import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Researcher } from './researcher.model';
import { ResearcherPopupService } from './researcher-popup.service';
import { ResearcherService } from './researcher.service';

@Component({
    selector: 'jhi-researcher-delete-dialog',
    templateUrl: './researcher-delete-dialog.component.html'
})
export class ResearcherDeleteDialogComponent {

    researcher: Researcher;

    constructor(
        private researcherService: ResearcherService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.researcherService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'researcherListModification',
                content: 'Deleted an researcher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-researcher-delete-popup',
    template: ''
})
export class ResearcherDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private researcherPopupService: ResearcherPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.researcherPopupService
                .open(ResearcherDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}