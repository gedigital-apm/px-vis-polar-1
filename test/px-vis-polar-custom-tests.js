// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here
  var polar = document.getElementById('polar');

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('defaults', function() {

    suiteSetup(function(done) {

      //give enough time for drawing
      flush(function() {
        setTimeout(function() {
          done();
        }, 600);
      })
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

      var reg = polar.querySelector('px-vis-register');
      assert.isFalse(reg.classList.contains('visuallyHidden'));
    });

    test('layers order', function() {
      var svg = polar.svg.nodes(),
          children = svg[0].childNodes,
          svgs = [];

      //because of mibofsoft we can't use 'children' on the svg, so building
      //it ourselves...
      for(var i = 0; i<children.length; i++) {
        //ignore text nodes
        if(children[i].nodeType !== 3 && children[i].id && children[i].id.indexOf('layer') === 0) {
          svgs.push(children[i]);
        }
      }

      //order MATTERS for svg drawing: first one is behind, last one on top
      assert.equal(polar.layer[0].node(), svgs[0]);
      assert.equal(polar.layer[1].node(), svgs[1]);
      assert.equal(polar.layer[2].node(), svgs[2]);
      assert.equal(polar.layer[3].node(), svgs[3]);
    });
  });

  suite('Update some props', function() {
    suiteSetup(function(done) {

      //clockwise
      polar.set('counterClockwise', true);

      //units
      var newConf = {
                "firstSerie": {
                "name": "Data",
                "y": "AVD-CHART-ASSET-CHILD03-ID.BR1X_1XAMP_ID",
                "x":"AVD-CHART-ASSET-CHILD03-ID.BR1X_1XPH_ID"
                }
            };
      newConf.firstSerie.yAxisUnit = 'my unit';
     //polar.set('seriesConfig',{});
      polar.set('seriesConfig', newConf);

       //give enough time for drawing
      setTimeout(function() {
        done();
      }, 400);
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
      }, 400);
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
      }, 400);
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
