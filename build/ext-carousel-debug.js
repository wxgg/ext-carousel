Ext.define('Ext.container.Carousel', {
    extend: 'Ext.container.Container',
    xtype: 'carousel',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    width: 200,
    items: [
        {
            html: 'Panel1'
        },
        {
            html: 'Panel2'
        },
        {
            html: 'Panel3'
        }
    ],
    time: 3000,
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                defaults: {
                    width: this.width
                },
                items: this.items
            }
        ];
        this.callParent();
    },
    listeners: {
        afterrender: function() {
            this.panel = this.down('panel');
            this.min = this.getX();
            this.del(0);
        }
    },
    del: function(index) {
        var a = index % this.panel.items.length;
        this.panel.animate({
            to: {
                x: !a ? this.min : this.min - a * this.width - 2
            }
        });
        Ext.defer(function(index) {
            this.del(index);
        }, this.time, this, [
            ++index
        ]);
    }
});

