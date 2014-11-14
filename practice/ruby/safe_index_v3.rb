#!/usr/bin/env ruby

def nil.up(_); end

class Object
  def up(key)
    respond_to?(:[]) ? self[key] : nil
  end
end

snd_under_foo = { foo: ['a', 'b'] }.up(:foo).up(1)
p snd_under_foo
# => 'b'

nothing = {}.up(4).up(91).up(:foobar)
p nothing
# => nil
