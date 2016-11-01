// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here
  var polar = document.getElementById('polar');

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('defaults', function() {

    suiteSetup(function(done) {

      //give enough time for drawing
      setTimeout(function() {
        done();
      }, 200);
    });

    test('counterClockwise false by default', function() {
      assert.isFalse(polar.counterClockwise);
    });

    test('labels are clockwise', function() {
      var labels = polar.svg.node().querySelectorAll('.title-group');

      assert.equal(labels[0].textContent, '0°');
      assert.equal(labels[1].textContent, '90°');
      assert.equal(labels[2].textContent, '180°');
      assert.equal(labels[3].textContent, '270°');
    });

    test('clockwise label', function() {
      var clockLabel = polar.svg.node().querySelector('.clockwise-group');

      assert.equal(clockLabel.textContent, 'clockwise');
    });

    test('no units drawn', function() {
      var unit = polar.svg.node().querySelector('.unit-group');
      assert.equal(unit.textContent, '');
    });

    test('register shown', function() {

      var reg = Polymer.dom(polar.root).querySelector('px-vis-register');
      assert.isFalse(reg.classList.contains('visuallyHidden'));
    });

    test('layers order', function() {

      var root = Polymer.dom(polar.root).querySelector('px-vis-svg'),
          svgs = Polymer.dom(root.root).querySelector('svg').children;

      //order MATTERS for svg drawing: first one is behind, last one on top
      assert.equal(polar._gridSvg.node(), svgs[0]);
      assert.equal(polar.svg.node(), svgs[1]);
      assert.equal(polar._drawingLineSvg.node(), svgs[2]);
      assert.equal(polar._drawingScatterSvg.node(), svgs[3]);
    });
  });

  suite('Update some props', function() {
    suiteSetup(function(done) {

      //clockwise
      polar.set('counterClockwise', true);

      //units
      var oldConf = polar.seriesConfig;
      polar.seriesConfig = {};
      oldConf.firstSerie.yAxisUnit = 'my unit';
      polar.set('seriesConfig', oldConf);

       //give enough time for drawing
      setTimeout(function() {
        done();
      }, 200);
    });

    test('labels are counter clockwise', function() {
      var labels = polar.svg.node().querySelectorAll('.title-group');

      assert.equal(labels[0].textContent, '0°');
      assert.equal(labels[3].textContent, '90°');
      assert.equal(labels[2].textContent, '180°');
      assert.equal(labels[1].textContent, '270°');
    });
  });

  suite('Chart counter clockwise', function() {
    suiteSetup(function(done) {

      polar.set('counterClockwise', true);
       //give enough time for drawing
      setTimeout(function() {
        done();
      }, 200);
    });

    test('labels are counter clockwise', function() {
      var labels = polar.svg.node().querySelectorAll('.title-group');

      assert.equal(labels[0].textContent, '0°');
      assert.equal(labels[3].textContent, '90°');
      assert.equal(labels[2].textContent, '180°');
      assert.equal(labels[1].textContent, '270°');
    });

    test('clockwise label', function() {
      var clockLabel = polar.svg.node().querySelector('.clockwise-group');

      assert.equal(clockLabel.textContent, 'counter clockwise');
    });

    test('units label show', function() {
      var unit = polar.svg.node().querySelector('.unit-group');
      assert.equal(unit.textContent, 'my unit');
    });
  });

  suite('custom labels', function() {

    suiteSetup(function(done) {
      //restore default clockwise
      polar.set('counterClockwise', false);

      //custom labels
      polar.set('axisLabels', ['North', 'East', 'South', 'West']);
      
      //give enough time for drawing
      setTimeout(function() {
        done();
      }, 200);
    });

    test('counterClockwise false', function() {
      assert.isFalse(polar.counterClockwise);
    });

    test('labels are clockwise', function() {
      var labels = polar.svg.node().querySelectorAll('.title-group');

      assert.equal(labels[0].textContent, 'North');
      assert.equal(labels[1].textContent, 'East');
      assert.equal(labels[2].textContent, 'South');
      assert.equal(labels[3].textContent, 'West');
    });

  });

  suite('Hide registers', function() {

    suiteSetup(function(done) {
      //restore default clockwise
      polar.set('hideRegister', true);
      
      //give enough time for drawing
      setTimeout(function() {
        done();
      }, 200);
    });

    test('register hidden', function() {

      var reg = Polymer.dom(polar.root).querySelector('px-vis-register');
      assert.isTrue(reg.classList.contains('visuallyhidden'));
    });

    test('hiding class function', function() {
      assert.equal(polar._getHideClass(false), '');
      assert.equal(polar._getHideClass(true), 'visuallyhidden');
    });

  });

};
