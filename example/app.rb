require 'sinatra/base'

class ExampleApp < Sinatra::Base
  get '/' do
    ' &#9836; I was born a unicorn  &#9836;'
  end
end
