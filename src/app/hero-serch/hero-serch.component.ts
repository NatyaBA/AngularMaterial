import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, switchMap
 }    from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-serch',
    templateUrl: './hero-serch.component.html',
    styleUrls: [ './hero-serch.component.css' ]
})

export class HeroSerchComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    private serchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    serch(term: string): void {
        this.serchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes$ = this.serchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.serchHeroes(term)),
        );
    }
}