
Ext.define('Ext.container.Carousel', {
    extend: 'Ext.container.Container',
  
    xtype: 'carousel',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    width: 200,
    items: [{
            bodyStyle: {
                    background: '#1abc9c'
                },
            html:'Panel1'
        },
        {
           bodyStyle: {
                    background: '#2ecc71'
                },
            html:'Panel2'
        },
        {
             bodyStyle: {
                    background: '#3498db'
                },
            html:'Panel3'

        }],
    time: 3000,
    initComponent: function()
	{
        var buttons = 
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

            },
            {
                xtype: 'container',
                width: 20,
                height: 20,
                defaults: { 
                    xtype: 'container'
                },
                x: 20,
                top:10,
                style: {
                    background: 'red',
                   
                },
                items: [
                    {
                       flex: 1,
                       style: {
                            background: 'red',
                            html:'asdgffffffffffffffffff',
                            width: 20,
                            height: 20
                        }
                    }
                ]
            }
        ];
        this.listeners =  {
                afterrender: function (){
                    this.panel = this.down('panel');
                    this.min = this.getX();
                    this.del(0)
                },
                mouseover: {
                    scope: this,
                    element: 'el',
                    fn: function(self){ 
                        this.stop = true;
                    }
                },
                mouseout:{
                    scope: this,
                    element: 'el',
                    fn: function(self){ 
                        this.stop = false;
                    }
                },
            };
        this.callParent();
    },
    del: function(index){
        var a = index % this.panel.items.length;
        if(!this.stop){
            this.panel.animate({
                to: {
                    x: !a ? this.min : this.min - a * this.width - 2
                }
            }); 
        }
        
        Ext.defer(function(index){
            this.del(index)
        }, this.time,this, [!this.stop?++index:index]);
    }
});
