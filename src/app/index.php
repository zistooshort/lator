<!DOCTYPE html>
<html manifest="cache.php">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
		<meta name="apple-mobile-web-app-title" content="iGBA">
		<link rel="apple-touch-icon" href="icon.png">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="google-translate-customization" content="32f6f438afca1eab-306f021d8025efca-gab0350d18d1b402e-19"></meta>
		<title>iGBA</title>
		<link rel="stylesheet" href="style.css?<?php echo time(); ?>">
	</head>
	<body class="layout-light theme-white">
		<div id="splash">
			<img src="icon.png">
			<p>iGBA</p>
		</div>
		<div class="statusbar-overlay"></div>
		<div class="views">
			<div class="view main-view">
				<div class="navbar">
					<div class="navbar-inner">
						<div class="center sliding">iGBA</div>
						<div class="right sliding">
							<a href="#" data-template="settings" class="link">
								<svg xmlns="http://www.w3.org/2000/svg" class="icons settings-icon" fill="#000000" height="36" viewBox="0 0 24 24" width="36">
									<path d="M0 0h24v24H0z" fill="none"/>
									<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
				<div class="pages navbar-fixed">
					<div data-page="home-1" class="page">
						<div class="page-content">
							<div class="content-block banner-wrap">
								<div class="content-block-inner banner">
									<img src="icon.png"/>
									<p>iGBA</p>
								</div>
							</div>
							<div class="rom-button">
								<label class="myLabel">
									<input type="file" id="file-picker" required placeholder="Pick a ROM">
									<span class="addrom">Add ROM</span>
								</label>
							</div>
							<div class="list-block inset">
								<ul>
									<li>
										<a href="#" data-template="roms" data-context-name="roms" class="item-content item-link">
											<div class="item-inner">
												<div class="item-title">ROMs</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script id="emukit" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding">
						<a href="#" class="back link">
							<i class="icon icon-back"></i>
							<span>About</span>
						</a>
					</div>
					<div class="center sliding">iEmuKit</div>
				</div>
			</div>
			<div class="page" data-page="emukit">
				<div class="page-content">
					<div class="content-block-title">iEmuKit Providers</div>
					<div class="list-block inset">
						<ul>
							{{#each emus}}
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">{{title}}</div>
									<div class="item-after igbakitdate">{{version}}</div>
								</div>
							</li>
							{{/each}}
						</ul>
					</div>
				</div>
			</div>
		</script>
		<script id="about" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding">
						<a href="#" class="back link">
							<i class="icon icon-back"></i>
							<span>Settings</span>
						</a>
					</div>
					<div class="center sliding">About</div>
				</div>
			</div>
			<div data-page="about" class="page">
				<div class="page-content">
					<div class="content-block-title">General</div>
					<div class="list-block inset">
						<ul>
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">Name</div>
									<div class="item-after">iGBA</div>
								</div>
							</li>
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">Developer</div>
									<div class="item-after">iGBA Team</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="content-block-title">Specs</div>
					<div class="list-block inset">
						<ul>
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">Emulator</div>
									<div class="item-after">GBA</div>
								</div>
							</li>
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">iGBA Version</div>
									<div class="item-after">0.9.1 (4F56GF)</div>
								</div>
							</li>
							<li class="item-content">
								<div class="item-inner">
									<div class="item-title">F7 Version</div>
									<div class="item-after f7version">{{f7}}</div>
								</div>
							</li>
							<li>
								<a href="#" data-template="emukit" data-context-name="emukit" class="item-content item-link">
									<div class="item-inner">
										<div class="item-title">iEmuKit</div>
										<div class="item-after iemukitdate">{{iemu}}</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</script>
		<script id="skins" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding"><a href="#" class="back link"> <i class="icon icon-back"></i><span>Settings</span></a></div>
					<div class="center sliding">Skins</div>
					<div class="right">
						<a href="createSkin.php" class="link">Create</a>
					</div>
				</div>
			</div>
			<div data-page="skins" class="page">
				<div class="page-content">
					<div id="iGBASkins-page">
						<div class="content-block-title">Current Skin</div>
						<div class="content-block">
							<div class="content-block-inner current-skin">
								<p class="current-skin-label"></p>
								<div class="current-skin-buttons">
									<div class="row">
										<div class="col-50"><div class="button edit-skin">Edit</div></div>
										<div class="col-50"><div class="button remove-skin">Remove</div></div>
									</div>
								</div>
							</div>
						</div>
						<div class="content-block-title">Skins</div>
						<div class="list-block">
							<ul>
							{{#each skins}}
								<li class="item-content">
									<div class="item-inner">
										<div class="item-title">{{name}}</div>
										<a href="#" class="button load-skin" data-skinname="{{name}}" data-skinurl="{{data}}" style="color: #ffb100; border-color: #ffb100;">Install</a>
									</div>
								</li>
							{{/each}}
							</ul>
						<div>
					</div> 
				</div>
			</div>
  		</script>
		<script id="settings" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding">
						<a href="#" class="back link">
							<i class="icon icon-back"></i>
							<span>iGBA</span>
						</a>
					</div>
					<div class="center sliding">Settings</div>
				</div>
			</div>
			<div data-page="settings" class="page">
				<div class="page-content">
					<div class="content-block-title">General</div>
					<div class="list-block inset">
						<ul>
							<li>
								<a href="#" data-template="about" data-context-name="about" class="item-content item-link">
									<div class="item-inner">
										<div class="item-title">About</div>
									</div>
								</a>
							</li>
							<li>
								<a href="#" data-template="skins" data-context-name="skins" class="item-content item-link">
									<div class="item-inner">
										<div class="item-title">Skins</div>
									</div>
								</a>
							</li>
							<li>
								<a href="#" data-template="credits" data-context-name="credits" class="item-content item-link">
									<div class="item-inner">
										<div class="item-title">Credits</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="content-block-title">Settings</div>
					<div class="list-block inset">
						<ul>
							<li>
								<div class="item-content">
									<div class="item-inner">
										<div class="item-title label">Dark Mode</div>
										<div class="item-after">
											<div class="item-input dark-mode">
												<label class="label-switch">
													<input type="checkbox">
													<div class="checkbox"></div>
												</label>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</script>
		<script id="credits" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding"><a href="#" class="back link"> <i class="icon icon-back"></i><span>Settings</span></a></div>
					<div class="center sliding">Credits</div>
				</div>
			</div>
			<div data-page="credits" class="page">
				<div class="page-content">
				{{#each credits}}
					<div class="content-block-title">{{title}}</div>
					<div class="list-block media-list inset">
						<ul>
						{{#each people}}
							<li>
							{{#if link}}
								<a href="{{link}}" class="item-link item-content external" target="_blank">
							{{else}}
								{{#if twitter}}
								<a href="https://twitter.com/{{twitter}}" class="item-link item-content external" target="_blank">
								{{else}}
								<div class="item-content">
								{{/if}}
							{{/if}}
									<div class="item-media">
										<img src="{{#if image}}{{image}}{{else}}{{#if twitter}}twitterimg.php?id={{twitter}}{{else}}icon.png{{/if}}{{/if}}" style="border-radius: 100%; width: 54px;">
									</div>
									<div class="item-inner">
										<div class="item-title-row">
											<div class="item-title">{{name}}</div>
											<div class="item-after">{{#if twitter}}Twitter{{else}}{{service}}{{/if}}</div>
										</div>
										<div class="item-subtitle">{{tag}}</div>
										<div class="item-text">{{desc}}</div>
									</div>
							{{#if link}}
								</a>
							{{else}}
								{{#if twitter}}
								</a>
								{{else}}
								</div>
								{{/if}}
							{{/if}}
							</li>
						{{/each}}
						</ul>
					</div>
				{{/each}}
				</div>
			</div>
		</script>
		<script id="roms" type="text/template7">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="left sliding">
						<a href="#" class="back link">
							<i class="icon icon-back"></i>
							<span>iGBA</span>
						</a>
					</div>
					<div class="center sliding">ROMs</div>
				</div>
			</div>
			<div data-page="roms" class="page">
				<form class="searchbar">
					<div class="searchbar-input">
						<input type="search" placeholder="Filter">
						<a href="#" class="searchbar-clear"></a>
					</div>
					<a href="#" class="searchbar-cancel">Cancel</a>
				</form>
				<div class="searchbar-overlay"></div>
				<div class="page-content">
					<div class="swiper-container rom-spotlight">
						<div class="swiper-wrapper">
							{{#top roms}}
							<div class="swiper-slide launch-rom" data-rom="{{json this}}">
								<img src="{{#if cover}}{{cover}}{{else}}icon.png{{/if}}">
								<span class="rom-spotlight-title">{{title}}</span>
							</div>
							{{/top}}
						</div>
						<div class="swiper-pagination"></div>
					</div>
					<div class="content-block searchbar-not-found">Nothing</div>
					<div class="list-block media-list inset list-block-search searchbar-found">
						<ul>
							{{#each roms}}
							<li class="item launch-rom" data-rom="{{json this}}">
								<div class="item-content">
									<div class="item-media">
										<img src="{{#if cover}}{{cover}}{{else}}icon.png{{/if}}" style="max-width: 50px">
									</div>
									<div class="item-inner">
										<div class="item-title-row">
											<div class="item-title">{{title}}</div>
										</div>
										<div class="item-subtitle">{{author}}</div>
									</div>
								</div>
							</li>
							{{/each}}
						</ul>
					</div>
				</div>
			</div>
		</script>
		<script type="text/javascript" src="script.js?<?php echo time(); ?>"></script>
	</body>
</html>