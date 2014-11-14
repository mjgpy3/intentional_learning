#!/usr/bin/env ruby

class NilClass
  def [](_); end
end

snd_under_foo = { foo: ['a', 'b'] }[:foo][1]
p snd_under_foo
# => 'b'

nothing = {}[4][91][:foobar]
p nothing
# => nil
