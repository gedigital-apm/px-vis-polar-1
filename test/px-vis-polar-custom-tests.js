function runCustomTests() {
  var polar;
  suite('defaults', function() {

    suiteSetup(function(done) {

      //give enough time for drawing
      flush(function() {
        setTimeout(function() {
          polar = document.getElementById('polar');
          done();
        }, 1000);
      })
    });

    test('counterClockwise false by default', function() {
      assert.isFalse(polar.counterClockwise);
    });

    test('labels are clockwise', function() {
      var labels = polar.svg.selectAll('.title-group');

      assert.equal(Px.d3.select(labels.nodes()[0]).text(), '0°');
      assert.equal(Px.d3.select(labels.nodes()[1]).text(), '90°');
      assert.equal(Px.d3.select(labels.nodes()[2]).text(), '180°');
      assert.equal(Px.d3.select(labels.nodes()[3]).text(), '270°');
    });

    test('clockwise label', function() {
      var clockLabel = polar.svg.select('.clockwise-group');

      assert.equal(clockLabel.text(), 'clockwise');
    });

    test('no units drawn', function() {
      var unit = polar.svg.select('.unit-group');
      assert.equal(unit.text(), '');
    });

    test('register shown', function() {

      var reg = Polymer.dom(polar.root).querySelector('px-vis-register');
      assert.isFalse(reg.classList.contains('hideAxis'));
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
      var clockLabel = polar.svg.select('.clockwise-group');

      assert.equal(clockLabel.text(), 'counter clockwise');
    });

    test('units label show', function() {
      var unit = polar.svg.select('.unit-group');
      assert.equal(unit.text(), 'my unit');
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
      var labels = polar.svg.selectAll('.title-group').nodes();

      assert.equal(Px.d3.select(labels[0]).text(), 'North');
      assert.equal(Px.d3.select(labels[1]).text(), 'East');
      assert.equal(Px.d3.select(labels[2]).text(), 'South');
      assert.equal(Px.d3.select(labels[3]).text(), 'West');
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
      assert.isTrue(reg.classList.contains('hideAxis'));
    });

    test('hiding class function', function() {
      assert.equal(polar._getHideClass(false), '');
      assert.equal(polar._getHideClass(true), 'hideAxis');
    });

  });

};
