#!/usr/bin/env ruby

class NilClass
  def up(_); end
end

module Enumerable
  def up(key)
    self[key]
  end
end


snd_under_foo = { foo: ['a', 'b'] }.up(:foo).up(1)
p snd_under_foo
# => 'b'

nothing = {}.up(4).up(91).up(:foobar)
p nothing
# => nil
