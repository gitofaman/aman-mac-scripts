import ciphercore as cc

c = cc.create_context()
with c:
    g = c.create_graph()
    with g:
        input1 = g.input(cc.array_type([10, 20], cc.INT32))
        input2 = g.input(cc.array_type([20, 30], cc.INT32))
        output = input1 @ input2
        output.set_as_output()
    g.set_as_main()