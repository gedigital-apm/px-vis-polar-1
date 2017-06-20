v2.0.1
===================
* Ensure old series are deleted from canvas if reusing the chart from a pool

v2.0.0
===================
* Upgrade to vis 2.0.0
* Added highlight components for optional crosshair
* Includes Web workers:
  * for scale calculations
  * for quadtree calculations
* added ability to have multi series
* added canvas
* New marker next to timestamp indicating which series the timestamp corresponds to.
* Internationalization support
* Breaking changes:
  * Default toolipData search now shows all series data at the closest timestamp
    * To use the old behavior of closest data values regardless of their timestamp, set "interactionSpaceConfig.searchType" to "pointPerSeries"
  * Defaults to using web workers
    * Use "preventWebWorkerSynchronization" to disable web worker. Will not be able to use quadtree or crosshair features.

v1.1.1
===================
* remove cleanOnDetached

v1.1.0
===================
* upgraded to vis 1.1.0
* added cleanOnDetached to allow reuse of the chart after detaching it from the dom. This is aimed at applications creating charts dynamically so that they can keep a pool of charts (simple array of charts) when removing them from the dom and reusing them later on with new data and config, improving performance . Turning cleanOnDetached on will make sure the chart will clear everything needed so that it draws properly with any new config. If using this strategy one thing to keep in mind is making sure the chart is re-appended in the dom *before* changing its properties to their new values. In most cases it would work even if appending it after, but some edge cases scenarios might fail to clean some visual artifact (for example switching from canvas to svg while deleting a few series at the same time). When moving the chart around the dom do not turn it on for performance boost and making sure you don't need the chart to force redrawing. This can be changed dynamically
* added debounceResizeTiming to control the debounce timiong on auto resize, changed default from 50ms to 250ms

v1.0.0
===================
* modified internal mechanism for sizing and laying out the chart
* added chartHorizontalAlignment and chartVerticalAlignment to alignt the chart drawing when smaller than its container
* alignment of the chart is now centered by default
* register now "stick" to the chart rather than sitting at the border of the container
* forceDateTimeDisplay is now turned off by default for tooltip and registers, it can be re-enabled through their respective configs
* Added layers
* Changed line to line-svg
* Added dynamic menus on registers
* Added toolbar, configurable through toolbarConfig
* changing ghp.sh to account for Alpha releases

v0.2.1
==================
* Themeable

v0.2.0
==================
* Updated dependencies

v0.1.15
==================
* changing all devDeps to ^

v0.1.14
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.1.13
==================
* update dependencies for dropdown

v0.1.12
==================
* removing px-theme style call


v0.1.11
==================
* bower updating px-demo-snippet

v0.1.10
===================
* added numbro to codepen

v0.1.9
===================
* fix codepen

v0.1.8
===================
* ensure markers svg is kept in sync with others

v0.1.7
===================
* ensure markers are always drawn on top of lines

v0.1.6
===================
* adjust labels position

v0.1.5
===================
* fixed use degrees so it is correct

v0.1.4
===================
* Updated dependencies

v0.1.2
===================
* make sure addition/removal of series to seriesConfig are correctly processed
* fixed demo scrollbar bug on IE

v0.1.1
===================
* Added math.max check to width and height

v0.1.0
===================
* Update diameter property to private
* moved to px-vis 0.6.0
* ensure tooltip-config is applied always

v0.0.8
==================
* change font size
* added preventResize

v0.0.7
==================
* draw maximum value for gridlines

v0.0.5
==================
* Dynamic tick count
* Fix labels

v0.0.4
==================
* removed chartExtents from radial scale

v0.0.3
==================
* make sure polarData behavior is coming from the right place

v0.0.2
==================
* travis integration, bump iron-ajax and add gh pages

v0.0.1
==================
* Initial release
