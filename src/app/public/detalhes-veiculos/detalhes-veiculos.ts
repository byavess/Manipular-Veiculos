import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VeiculoService, Veiculo } from '../../veiculo.service';

@Component({
  selector: 'app-detalhes-veiculos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
      
      <!-- Botão Voltar -->
      <button 
        [routerLink]="['/public/home']"
        style="background: #95a5a6; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-bottom: 20px;">
        ← Voltar para Vitrine
      </button>

      <!-- Loading -->
      <div *ngIf="carregando" style="text-align: center; padding: 40px;">
        <p>Carregando detalhes do veículo...</p>
      </div>

      <!-- Erro -->
      <div *ngIf="erro" style="background: #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <p style="color: #e74c3c; margin: 0;">{{ erro }}</p>
        <button 
          [routerLink]="['/public/home']"
          style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 3px; cursor: pointer; margin-top: 10px;">
          Voltar para Home
        </button>
      </div>

      <!-- Detalhes do Veículo -->
      <div *ngIf="!carregando && veiculo" style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Imagem Grande -->
        <div style="width: 100%; height: 400px; overflow: hidden;">
  <img 
    [src]="getPrimeiraImagem(veiculo)" 
    [alt]="veiculo.modelo"
    style="width: 100%; height: 100%; object-fit: cover;"
    (error)="onImageError($event)">
</div>

        <!-- Informações -->
        <div style="padding: 30px;">
          <h1 style="color: #2c3e50; margin: 0 0 10px 0;">{{ veiculo.marca }} {{ veiculo.modelo }}</h1>
          <p style="color: #7f8c8d; font-size: 1.2em; margin: 0 0 20px 0;">Ano: {{ veiculo.ano }} | Cor: {{ veiculo.cor || 'Não informada' }}</p>
          
          <div style="background: #27ae60; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; font-size: 2em;">R$ {{ veiculo.preco | number:'1.2-2' }}</h2>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2c3e50;">Descrição</h3>
            <p style="color: #34495e; line-height: 1.6; font-size: 1.1em;">{{ veiculo.descricao || 'Descrição não disponível.' }}</p>
          </div>

          <!-- Botões de Ação -->
          <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button 
              style="background: #e74c3c; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; flex: 1;"
              (click)="deletarVeiculo()">
              🗑️ Deletar Veículo
            </button>
            <button 
              style="background: #f39c12; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; flex: 1;">
              ✏️ Editar Veículo
            </button>
            <button 
              style="background: #27ae60; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; flex: 2;"
              (click)="comprarVeiculo()">
              🛒 Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DetalhesVeiculos implements OnInit {
  veiculo: Veiculo | null = null;
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {
    this.carregarDetalhes();
  }

  carregarDetalhes(): void {
    this.carregando = true;
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🔍 Carregando detalhes do veículo ID:', id);

    this.veiculoService.getVeiculoById(id).subscribe({
      next: (dados: Veiculo) => {
        this.veiculo = dados;
        this.carregando = false;
        console.log('✅ Detalhes carregados:', this.veiculo);
      },
      error: (erro: any) => {
        this.carregando = false;
        this.erro = 'Erro ao carregar detalhes do veículo.';
        console.error('❌ Erro:', erro);
      }
    });
  }

  deletarVeiculo(): void {
    if (this.veiculo && confirm(`Tem certeza que deseja deletar ${this.veiculo.marca} ${this.veiculo.modelo}?`)) {
      this.veiculoService.deleteVeiculo(this.veiculo.id).subscribe({
        next: () => {
          alert('Veículo deletado com sucesso!');
          this.router.navigate(['/public/home']);
        },
        error: (erro) => {
          alert('Erro ao deletar veículo. Veja o console.');
          console.error('❌ Erro ao deletar:', erro);
        }
      });
    }
  }

  comprarVeiculo(): void {
    if (this.veiculo) {
      alert(`🎉 Parabéns! Você comprou o ${this.veiculo.marca} ${this.veiculo.modelo} por R$ ${this.veiculo.preco}`);
    }
  }

  onImageError(event: any): void {
    event.target.src = 'https://placehold.co/800x400?text=Imagem+Não+Encontrada';
  }

  getPrimeiraImagem(veiculo: Veiculo): string {
  if (veiculo.urlsFotos && veiculo.urlsFotos.length > 0) {
    return veiculo.urlsFotos[0];
  }
  return 'https://placehold.co/800x400?text=Sem+Imagem';
}
}