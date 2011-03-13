require 'sinatra/base'

class ExampleApp < Sinatra::Base
  get '/' do
    '<html><head><title>Nodicorn Test</title></head><body>&#9836; I was born a unicorn&#9836<body></html>'
  end

  post '/echo' do 
    params[:msg]
  end

end
