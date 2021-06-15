'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">articles documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-8a403c718ee5060896d48675bc078828"' : 'data-target="#xs-controllers-links-module-AppModule-8a403c718ee5060896d48675bc078828"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8a403c718ee5060896d48675bc078828"' :
                                            'id="xs-controllers-links-module-AppModule-8a403c718ee5060896d48675bc078828"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-8a403c718ee5060896d48675bc078828"' : 'data-target="#xs-injectables-links-module-AppModule-8a403c718ee5060896d48675bc078828"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8a403c718ee5060896d48675bc078828"' :
                                        'id="xs-injectables-links-module-AppModule-8a403c718ee5060896d48675bc078828"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link">ArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' : 'data-target="#xs-controllers-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' :
                                            'id="xs-controllers-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' }>
                                            <li class="link">
                                                <a href="controllers/ArticleController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' : 'data-target="#xs-injectables-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' :
                                        'id="xs-injectables-links-module-ArticleModule-bdb2f156a8015bc75ec99050d134ebaa"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ArticleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorModule.html" data-type="entity-link">AuthorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' : 'data-target="#xs-controllers-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' :
                                            'id="xs-controllers-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthorController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' : 'data-target="#xs-injectables-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' :
                                        'id="xs-injectables-links-module-AuthorModule-ccb3517005aa60ed05b1f12bb0dfc40a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentModule.html" data-type="entity-link">CommentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' : 'data-target="#xs-controllers-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' :
                                            'id="xs-controllers-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' }>
                                            <li class="link">
                                                <a href="controllers/CommentController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' : 'data-target="#xs-injectables-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' :
                                        'id="xs-injectables-links-module-CommentModule-62647791e097fb6784d834a5bd08d6d4"' }>
                                        <li class="link">
                                            <a href="injectables/CommentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikeModule.html" data-type="entity-link">LikeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' : 'data-target="#xs-controllers-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' :
                                            'id="xs-controllers-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' }>
                                            <li class="link">
                                                <a href="controllers/LikeController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LikeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' : 'data-target="#xs-injectables-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' :
                                        'id="xs-injectables-links-module-LikeModule-aa65c2ab45001e3151ae09e41592abe7"' }>
                                        <li class="link">
                                            <a href="injectables/LikeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LikeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-0a902ac3312298cc2690686ca03eb1fb"' : 'data-target="#xs-injectables-links-module-SharedModule-0a902ac3312298cc2690686ca03eb1fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-0a902ac3312298cc2690686ca03eb1fb"' :
                                        'id="xs-injectables-links-module-SharedModule-0a902ac3312298cc2690686ca03eb1fb"' }>
                                        <li class="link">
                                            <a href="injectables/StringsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StringsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ArticleController.html" data-type="entity-link">ArticleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthorController.html" data-type="entity-link">AuthorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommentController.html" data-type="entity-link">CommentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LikeController.html" data-type="entity-link">LikeController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Article.html" data-type="entity-link">Article</a>
                            </li>
                            <li class="link">
                                <a href="classes/Author.html" data-type="entity-link">Author</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArticleDto.html" data-type="entity-link">CreateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthorDto.html" data-type="entity-link">CreateAuthorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link">CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrDeleteLikeDto.html" data-type="entity-link">CreateOrDeleteLikeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Like.html" data-type="entity-link">Like</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateArticleDto.html" data-type="entity-link">UpdateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidIdDto.html" data-type="entity-link">ValidIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidSorted.html" data-type="entity-link">ValidSorted</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidValue.html" data-type="entity-link">ValidValue</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticleService.html" data-type="entity-link">ArticleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthorService.html" data-type="entity-link">AuthorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link">CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikeService.html" data-type="entity-link">LikeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StringsService.html" data-type="entity-link">StringsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});