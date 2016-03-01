define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');

  require('plugins/kbn_sunburst_vis/kbn_sunburst_vis.less');
  require('plugins/kbn_sunburst_vis/kbn_sunburst_vis_controller');

  require('ui/registry/vis_types').register(KbnSunburstVisProvider);

  function KbnSunburstVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kbn_sunburst',
      title: 'Sunburst Diagram',
      icon: 'fa-life-ring',
      description: 'Cool D3 Sunburst',
      template: require('plugins/kbn_sunburst_vis/kbn_sunburst_vis.html'),
      params: {
        defaults: {
          showMetricsAtAllLevels: false
        },
        editor: '<vislib-basic-options></vislib-basic-options>'
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Split Size',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Levels',
          aggFilter: '!geohash_grid',
          min: 0,
          max: 2
        }
      ]),
      requiresSearch: true
    });
  }

  // export the provider so that the visType can be required with Private()
  return KbnSunburstVisProvider;
});
