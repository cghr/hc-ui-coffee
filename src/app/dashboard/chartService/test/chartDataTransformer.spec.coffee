describe 'factory:chartDataTransformer', ->

  describe 'transform data', ->

    ChartDataTransformer = null
    beforeEach(module('chartDataTransformer'))
    beforeEach(inject((_ChartDataTransformer_) ->
      ChartDataTransformer = _ChartDataTransformer_
    ))

    it('should transform the given data', ->
      input = [
        {country: 'india', total: 100, month: 80},
        {country: 'pakistan', total: 80, month: 100},
        {country: 'srilanka', total: 40, month: 20}
      ]

      output = {
        series: ['total', 'month'],
        data: [
          {x: 'india', y: [100, 80]},
          {x: 'pakistan', y: [80, 100]},
          {x: 'srilanka', y: [40, 20]}]
      }
      expect(ChartDataTransformer.transform(input)).toEqual(output)
    )

