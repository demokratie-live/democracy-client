# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2018-10-29
### Changed
- [Filter] renamed "Aktivitäten" -> "Eigene Aktivitäten" [#532](https://github.com/demokratie-live/democracy-client/issues/532)
- [Details] Adjusted color of legend-labels below charts for better readability [#566](https://github.com/demokratie-live/democracy-client/issues/566)
- [Donate] get donation status by API
- [Detail] Show government vote result without own voting for past procedures
- [Detail] Add "Abstimmung in" text to left time to vote

### Fixed
- [Detail] remove pixel line on empty barChart
- [Donation] Fix Donation bar gap
- [Charts] unified all Chart-Fonts [#573](https://github.com/demokratie-live/democracy-client/issues/573)

### Added
- [Detail] government named vote info

## [1.0.4] - 2018-09-29
### Fixed
- [Support] Typo
- [Verify] Fix crash click donate after verification
- [PieCharts] Show vote result numbers

## [1.0.3] - 2018-09-28
### Fixed
- [Donate] Fixed Typo (iOS)

## [1.0.2] - 2018-09-28
### Changed
- [Share] URL is no longer shortened

### Fixed
- [PieCharts] Android crash

## [0.10.3] - 2018-09-26
### Added
- [Statistic] Add new Statistic page
- [Share] Add share button to detail page

### Fixed
- [PieCharts] Fix piecharts for ipad 

## [0.10.2] - 2018-09-19
### Added
- [SMS Verification] Success Screen
- [Donate] Donate informations
- [FAQ] New FAQ page
- [BurgerMenu] New Texts for all Menus
- [BurgerMenu] Statistic Screen

### Changed
- [Filter] changed colors of disabled Sub-Checkboxes [#533](https://github.com/demokratie-live/democracy-client/issues/533)
- [Tutorial] Removed "Diskutiere" and corrected spelling mistake [#371](https://github.com/demokratie-live/democracy-client/issues/371) & [#236](https://github.com/demokratie-live/democracy-client/issues/236)

## [0.10.1] - 2018-09-17
### Added
- Beta End Nag Screen

### Changed
- [VoteList] improve filter performance - faster not-/voted query

### Fixed
- [Search] Search Button fix [#248](https://github.com/demokratie-live/democracy-client/issues/248)
- Push Notifications for Android open Detailpage [#454](https://github.com/demokratie-live/democracy-client/issues/454)

## [0.10.0] - 2018-09-04
### Changed
- [Credits] Lover of the month
- [Details] Add pre points to history
- JWT Headerbased Authentication

### Added
- SMS-Verification
- [Details] Fraction Results

## [0.9.0] - 2018-08-02
### Added
- [Search] History
- [VoteList] Filters [#375](https://github.com/demokratie-live/democracy-client/issues/375)

### Fixed
- [Bug] Save vote-data in local keychain [#322](https://github.com/demokratie-live/democracy-client/issues/322)

## [0.8.0] - 2018-06-29
### Added
- Push Notifications
- Add deep linking
- [Details] Add PDF-reader [#249](https://github.com/demokratie-live/democracy-client/issues/249)
- Add time until government-vote [#358](https://github.com/demokratie-live/democracy-client/issues/358)
- [Details] History segment of current states to Detail page
- [iOS] network indicator in status bar [#367](https://github.com/demokratie-live/democracy-client/issues/367)
- [ListView] load more indicator [#368](https://github.com/demokratie-live/democracy-client/issues/368)
- [Detail] No connectoin reload button [#387](https://github.com/demokratie-live/democracy-client/issues/387)
- [Details] Add type to vote segment header [#378](https://github.com/demokratie-live/democracy-client/issues/378)

### Changed
- [ListView] improve performance by shouldUpdateComponent check [#362](https://github.com/demokratie-live/democracy-client/issues/362)
- [ListView] change style of rest time to agenda
- [ListView & Notification Settings] Style of segment headers
- [iOS] Go back by swiping from left to right [#354](https://github.com/demokratie-live/democracy-client/issues/354)
- [iOS] Override Alpha Versions
- Changelog format
- [Details] Hide vote result in history if not voted
- [Details] Government PieChart colors

### Fixed
- [Notifications] Fixed typo
- [Details] Padstart caused a crash - use lodash padstart instead

## [0.7.10] - 2018-06-11
### Fixed
- [Search] do not use cache for search results

## [0.7.9] - 2018-06-01
### Changed
- [Credits] replace lover of the month

### Fixed
- [ListView] highlight "Vergangen" segment header [#308](https://github.com/demokratie-live/democracy-client/issues/308)
- [Details] change current status if user has not voted [#328](https://github.com/demokratie-live/democracy-client/issues/328)
- [Details] Change pie-chart labels [#310](https://github.com/demokratie-live/democracy-client/issues/310)
- [Search] Update listView after userInteractions [#312](https://github.com/demokratie-live/democracy-client/issues/312)
- improve app start performance [#281](https://github.com/demokratie-live/democracy-client/issues/281)

## [0.7.8] - 2018-05-26
### Fixed
-	 increase offline cache to prevent lost vote data [#322](https://github.com/demokratie-live/democracy-client/issues/322)

## [0.7.7] - 2018-05-18
### Changed
- [Details] votepie labels has colordots, votepie percentage labels [#310](https://github.com/demokratie-live/democracy-client/issues/310)
- [Details] lock vote buttons if user has already voted and local vote is lost
- [Details] colors for bundestag results same as community result
- [Details] grey circle for zurückgezogen

## [0.7.6] - 2018-05-03
### Changed
- Show Current/Past Votes based upon completed field, unified procedureState lists to determin inapp state [#306](https://github.com/demokratie-live/democracy-client/issues/306)
- [Details] Increased all font sizes by 1pt [#260](https://github.com/demokratie-live/democracy-client/issues/260)
- [Details] Increased contrast of "Inhalt" by 5pt [#223](https://github.com/demokratie-live/democracy-client/issues/223)

### Fixed
- [Support] Warn User if Mail/Tel/Web Operation cannot be performed [#219](https://github.com/demokratie-live/democracy-client/issues/219)

## [0.7.5] - 2018-04-27
### Added
- [Details] Add notification for BallotBox [#232](https://github.com/demokratie-live/democracy-client/issues/232)

### Changed
- [Details] Fix bell position [#301](https://github.com/demokratie-live/democracy-client/issues/301)
- [Details] Change vote button labels after voting [#302](https://github.com/demokratie-live/democracy-client/issues/302)
- [Details] Disabled pushNotifications due to non-functionality

## [0.7.4]
### Added
- [Details] Add labels to vote buttons [#293](https://github.com/demokratie-live/democracy-client/issues/293)

## [0.7.3]
### Changed
- Replace png's with svg's for performance improvements [#238](https://github.com/demokratie-live/democracy-client/issues/238)

## [0.7.2]
### Fixed
- [Lists] Prevent Double Navigation on Android [#183](https://github.com/demokratie-live/democracy-client/issues/183)

## [0.7.1]
### Added
- [Details] Scroll to document-segment content [#231](https://github.com/demokratie-live/democracy-client/issues/231)
- [Lists] Add voted marker [#246](https://github.com/demokratie-live/democracy-client/issues/246)
  
### Changed
- [Details] Seperate vote results [#271](https://github.com/demokratie-live/democracy-client/issues/271)
- [Details] Change PieChart label for community-votes & title [#253](https://github.com/demokratie-live/democracy-client/issues/253)

## [0.7.0]
### Added
- [Details] Add non-roll-call vote results

## [0.6.8]
### Added
- [Tutorial] Swipe on click blue circle [#237](https://github.com/demokratie-live/democracy-client/issues/237)

### Changed
- [Details] Change vote results order [#234](https://github.com/demokratie-live/democracy-client/issues/234)
- [Details] Change title for "in Vorbeeitung" [#252](https://github.com/demokratie-live/democracy-client/issues/252)
- [Credits] Change logo order [#242](https://github.com/demokratie-live/democracy-client/issues/242)
- [Details] Do not increase activity-index on toggle notification settings [#245](https://github.com/demokratie-live/democracy-client/issues/245)

### Fixed
- [Tutorial] Fix spelling mistake [#243](https://github.com/demokratie-live/democracy-client/issues/243) [#235](https://github.com/demokratie-live/democracy-client/issues/235) [#236](https://github.com/demokratie-live/democracy-client/issues/236)
- [Details] Fix positioning of vote results [#234](https://github.com/demokratie-live/democracy-client/issues/234)

## [0.6.7]
### Changed
- [Voting] border color between vote and Warning lighter

## [0.6.6]
### Changed
- [Voting] adjusted expand-icon height

## [0.6.5]
### Fixed
- generate a new auth token by incorrect user

## [0.6.4]
### Fixed
- [Android] fix crash

## [0.6.3]
### Changed
- [Details] shorter text for "Gesetzgebung"

## [0.6.2]
### Added
- [Credits] [New] add credits screen
  
### Fixed
- [Support] reduce scroll length
- [Security] reduce scroll length

## [0.6.1]
### Changed
- [Improvement] Load activityIndex within procedure queries

### Fixed
- [Bug] reload cached data from server

## [0.6.0]
### Added
 Add "Antrag" as new procedure type

## [0.5.4]
### Fixed
- [Support][Android] fix phone & email button actions

## [0.5.3]
### Fixed
- show votepanel for procedures in all lists

## [0.5.2]
### Fixed
- [Details][Android] show data on refresh

## [0.5.1]
### Fixed
- Handle app crash in Airplane mode

## [0.5.0]
### Added
- VoteVerification ("Schon gewusst?") Screen to verify your vote selection

## [0.4.1]
### Fixed
- Fix API Url

## [0.4.0]
### Added
- Add Push Notifications

## [0.3.5]
### Added
- [Details] Add current State
  
### Changed
- [Support] Text width
- [Support] Text
- [Support] Image
  
### Fixed
- [Support][Android] Do not close on back button

## [0.3.4]
### Fixed
- [Support] App killing on click e-mail & github button resolved

## [0.3.3]
### Fixed
- Remove Emoji from changelog

## [0.3.2]
### Added
- [Details] Label to PieChart
  
### Changed
- [Details] Change VoteButton style
  
### Fixed
- [Details] Increase activity index directly

## [0.3.1]
### Fixed
- [Support] Add contact data

## [0.3.0]
### Added
- Voting for users is now possible!

## [0.2.4]
### Security
- [Android] Removed unnecessary Permissions [#172](https://github.com/demokratie-live/democracy-client/issues/172)

## [v0.2.3]
### Security
- use https server

## [0.2.2]
### Fixed
- [Details] Fix overlapping Details
- [Details] Fix width of PieChart

## [0.2.1]
### Fixed 
- [Tutorial] Fixe Umbrüche entfernt [#160](https://github.com/demokratie-live/democracy-client/issues/160)
- [Tutorial] Abstände angepasst [#159](https://github.com/demokratie-live/democracy-client/issues/159)
- [Tutorial] Schrift-Dicke reduziert

[Unreleased]: https://github.com/demokratie-live/democracy-client/compare/master...HEAD
