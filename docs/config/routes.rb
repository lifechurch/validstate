Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  match 'demo/(*any)' , to: "demo#index", via: :all, as: "demo"
end
